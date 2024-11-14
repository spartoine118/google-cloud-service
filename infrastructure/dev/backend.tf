terraform {
  backend "gcs" {
    bucket = var.storage_name
  }
}
