variable "REGION" {
  type      = string
  nullable  = false
  default   = "us-central1"
  sensitive = true
}

variable "PROJECT_ID" {
  type      = string
  nullable  = false
  default   = "cloud-container-441508"
  sensitive = true
}

variable "ENV" {
  type     = string
  nullable = false
  default  = "dev"
}

variable "DOCKER_IMAGE" {
  type     = string
  nullable = false
  default  = "spartoine118/cloud-service:11718396221"
}

variable "SA_KEY" {
  type      = string
  nullable  = false
  sensitive = true
}

data "google_secret_manager_secret_version" "SA_EMAIL" {
  secret  = "GKE_SA_EMAIL"
  version = "latest"
}
