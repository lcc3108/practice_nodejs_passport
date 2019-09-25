# GCP SETTING
provider "google" {
  credentials = "${file("google_key.json")}"
  project     = "nodejs-lcc3108"
  region      = "asia-east2"
}

data "archive_file" "backend_zip" {
  type        = "zip"
  source_dir  = "./backend/dist"
  output_path = "./backend.zip"
}

data "archive_file" "frontend_zip" {
  type        = "zip"
  source_dir  = "./frontend/build"
  output_path = "./frontend.zip"
}

resource "google_storage_bucket" "bucket" {
  name = "lcc3108-nodejs-test-bucket"
}

resource "google_storage_bucket_object" "backend_object" {
  name   = "${data.archive_file.backend_zip.output_base64sha256}.zip"
  bucket = "${google_storage_bucket.bucket.name}"
  source = "${data.archive_file.backend_zip.output_path}"
}

resource "google_storage_bucket_object" "frontend_object" {
  name   = "${data.archive_file.frontend_zip.output_base64sha256}.zip"
  bucket = "${google_storage_bucket.bucket.name}"
  source = "${data.archive_file.frontend_zip.output_path}"
}

resource "google_cloudfunctions_function" "function" {
  name                  = "lcc3108-function-test"
  description           = "My function"
  runtime               = "nodejs8"

  available_memory_mb   = 256
  source_archive_bucket = "${google_storage_bucket.bucket.name}"
  source_archive_object = "${google_storage_bucket_object.backend_object.name}"
  trigger_http          = true
  timeout               = 60
  entry_point           = "graphql"
}

resource "google_app_engine_standard_app_version" "version_id" {
  version_id = "v1"
  service = "default"
  runtime = "nodejs10"
  noop_on_destroy = true
  deployment {
    zip {
      source_url = "https://storage.googleapis.com/${google_storage_bucket.bucket.name}/${google_storage_bucket_object.frontend_object.name}"
    }
  }

  handlers {
    url_regex = "/"
    static_files {
      path = "index.html"
      upload_path_regex= "index.html"
      require_matching_file = false
    }
  }

  handlers {
    url_regex = "/(.*)"
    static_files {
      path = "\\1"
      upload_path_regex= ".*"
      require_matching_file = false
    }
  }
}
# AWS SETTING

provider "aws" {
  region                  = "us-west-2"
  shared_credentials_file = "awskey.csv"
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "terraform"
}

resource "aws_lambda_function" "aws_function" {
 filename = "${data.archive_file.backend_zip.output_path}"
 function_name="test"
   source_code_hash = "${filebase64sha256("./backend.zip")}"
 runtime = "nodejs8.10"
   handler       = "exports.test"
   role= "${aws_iam_role.la}"

}