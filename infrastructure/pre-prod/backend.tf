terraform {
  backend "gcs" {
    bucket = "cloud-function-bucket-7674705bf818c9ea"
    prefix = "pre-prod/"
  }
}
