variable "aws_region" {}

variable "domain_name" {}

variable "hosted_zone" {}

variable "tags" {
  type    = map
  default = {}
}

data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    sid = "1"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.domain_name}/*",
    ]

    principals {
      type = "AWS"

      identifiers = [
        aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn
      ]
    }
  }
}

data "aws_route53_zone" "domain_name" {
  name         = var.hosted_zone

  private_zone = false
}

resource "aws_acm_certificate" "cert" {
    domain_name       = var.domain_name
    subject_alternative_names = ["*.${var.domain_name}"]
    validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation" {
    name     = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
    type     = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
    zone_id  = data.aws_route53_zone.domain_name.id
    records  = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
    ttl      = 60
}

resource "aws_acm_certificate_validation" "cert" {
    certificate_arn         = aws_acm_certificate.cert.arn
}


resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.domain_name
  acl    = "private"
  region = var.aws_region

  versioning {
    enabled = true
  }


  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = data.aws_iam_policy_document.s3_bucket_policy.json

  tags = var.tags
}

resource "aws_route53_record" "route53_record" {
  depends_on = [
    aws_cloudfront_distribution.s3_distribution
  ]

  zone_id = data.aws_route53_zone.domain_name.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name    = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id = "Z2FDTNDATAQYW2"

    //HardCoded value for CloudFront
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [
    aws_s3_bucket.s3_bucket
  ]

  origin {
    domain_name = aws_s3_bucket.s3_bucket.bucket_domain_name
    origin_id   = "s3-cloudfront"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    "${var.domain_name}",
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "s3-cloudfront"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }

  price_class = "PriceClass_100"

  //Only US,Canada,Europe

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
  custom_error_response {
    error_code            = 403
    response_code         = 200
    error_caching_min_ttl = 0
    response_page_path    = "/"
  }
  tags = var.tags
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${var.domain_name}.s3.amazonaws.com"
}



output "bucket_name" {
    value = aws_s3_bucket.s3_bucket.id
}

# output "bucket_domain" {
#     value = aws_s3_bucket.s3_bucket.website_endpoint
# }

# output "bucket_hosted_zone_id" {
#     value = aws_s3_bucket.s3_bucket.hosted_zone_id
# }

# output "cf_domain" {
#     value = aws_cloudfront_distribution.s3_distribution.domain_name
# }

# output "cf_hosted_zone_id" {
#     value = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
# }

output "distribution_id" {
    value = aws_cloudfront_distribution.s3_distribution.id
}

output "certificate_arn" {
    value = aws_acm_certificate.cert.arn
}