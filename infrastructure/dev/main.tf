terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.10.0"
    }
  }
}

resource "random_id" "default" {
  byte_length = 8
}

module "storage" {
  source   = "../modules/google-storage-bucket"
  name     = "cloud-function-bucket-${var.ENV}-7674705bf818c9ea"
  location = var.REGION
}

resource "local_file" "default" {
  file_permission = "0644"
  filename        = "${path.module}/backend.tf"

  # You can store the template in a file and use the templatefile function for
  # more modularity, if you prefer, instead of storing the template inline as
  # we do here.
  content = <<-EOT
  terraform {
    backend "gcs" {
      bucket = "${module.storage.name}"
    }
  }
  EOT
}

module "service" {
  source          = "../modules/google-cloud-service"
  image-name      = var.DOCKER_IMAGE
  name            = "cloud-function-dev"
  location        = var.REGION
  service-account = data.google_secret_manager_secret_version.GKE_SA_EMAIL.secret_data
}

module "scheduler" {
  source                = "../modules/google-cloud-scheduler"
  name                  = "cloud-service-daily-scheduler-dev"
  uri                   = module.service.service-uri
  service_account_email = data.google_secret_manager_secret_version.GKE_SA_EMAIL.secret_data
  audience              = module.service.service-uri
}
