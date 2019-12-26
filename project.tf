variable "aws_region" {}
variable "domain_name" {}
variable "hosted_zone" {}

provider "aws" {
  region = var.aws_region
}

module "main" {
    source           = "./deploy"
    hosted_zone      = var.hosted_zone
    domain_name      = var.domain_name
    aws_region       = var.aws_region
}

output "bucket_name" {
    value = module.main.bucket_name
}

output "distribution_id" {
    value = module.main.distribution_id
}

output "certificate_arn" {
    value = module.main.certificate_arn
}