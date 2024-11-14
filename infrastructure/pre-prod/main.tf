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

resource "local_file" "default" {
  file_permission = "0644"
  filename        = "${path.module}/${var.ENV}/backend.tf"

  # You can store the template in a file and use the templatefile function for
  # more modularity, if you prefer, instead of storing the template inline as
  # we do here.
  content = <<-EOT
  terraform {
    backend "gcs" {
      bucket = "${var.storage_name}"
    }
  }
  EOT
}

module "service" {
  source          = "../modules/google-cloud-service"
  image_name      = var.DOCKER_IMAGE
  name            = "cloud-function-pre-prod"
  location        = var.REGION
  service_account = data.google_secret_manager_secret_version.SA_EMAIL.secret_data
  container_env   = var.container_env
}

module "scheduler" {
  source                = "../modules/google-cloud-scheduler"
  name                  = "cloud-service-daily-scheduler-pre-prod"
  uri                   = module.service.service_uri
  service_account_email = data.google_secret_manager_secret_version.SA_EMAIL.secret_data
  audience              = module.service.service_uri
}
