locals {
  service_account_email = [{
    name  = "SERVICE_ACCOUNT_EMAIL"
    value = var.service_account
  }]
}

variable "container_env" {
  description = "environment variables inside the container"
  type = list(object({
    name  = string
    value = string
  }))
  nullable = false
}
