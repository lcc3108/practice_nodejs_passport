provider "google" {
  credentials = "${file("google_key.json")}"
  project     = "nodejs-lcc3108"
  region      = "asia-east2"
}


data "archive_file" "helloGET_zip" {
 type        = "zip"
 source_dir  = "./dist"
 output_path = "./index.zip"
}

resource "google_storage_bucket" "bucket" {
  name = "lcc3108-nodejs-test-bucket"
}

resource "google_storage_bucket_object" "archive" {
  name   = "${data.archive_file.helloGET_zip.output_base64sha256}.zip"
  bucket = "${google_storage_bucket.bucket.name}"
  source = "${data.archive_file.helloGET_zip.output_path}"

}

resource "google_cloudfunctions_function" "function" {
  name                  = "lcc3108-function-test"
  description           = "My function"
  runtime               = "nodejs8"

  available_memory_mb   = 256
  source_archive_bucket = "${google_storage_bucket.bucket.name}"
  source_archive_object = "${google_storage_bucket_object.archive.name}"
  # event_trigger {
  #   event_type = "providers/cloud.storage/eventTypes/object.change"
  #   resource   = "${google_storage_bucket.bucket.name}"
  #   failure_policy {
  #     retry = true
  #   }

  # }
  trigger_http          = true
  # source_repository {
  #   url = "https://github.com/lcc3108/practice_nodejs_passport"
  # }
  timeout               = 60
  entry_point           = "graphql"
}



