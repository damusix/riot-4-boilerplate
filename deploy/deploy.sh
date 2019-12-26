#!/usr/bin/env bash


if [ -f ".env" ] ; then

    npm run test

    if [ $? -gt 0 ]; then
        exit $?
    fi

    export $(cat .env | grep -v '^\#' | xargs);

    npm run build;

    aws s3 sync assets s3://$AWS_S3_BUCKET_NAME/assets --delete;
    aws s3 cp index.html s3://$AWS_S3_BUCKET_NAME

    aws cloudfront create-invalidation --distribution-id $AWS_CF_DISTRIBUTION_ID --paths "/*";
else
    echo ".env file does not exist. Cannot deploy!";
    exit 1;
fi
