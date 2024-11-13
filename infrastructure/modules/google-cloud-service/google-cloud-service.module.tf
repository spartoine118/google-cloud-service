resource "google_cloud_run_v2_service" "service" {
  name                = var.name
  location            = var.location
  deletion_protection = false
  ingress             = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.image_name
      dynamic "env" {
        // This might not work mby we need to put service_account inside brackets
        for_each = concat(local.service_account_email, var.container_env)
        content {
          name  = env.value.name
          value = env.value.value
        }
      }
      ports {
        container_port = 3000
      }
      resources {
        startup_cpu_boost = false
      }
    }
    service_account = var.service_account
    scaling {
      min_instance_count = 0
      max_instance_count = 100
    }
    execution_environment = "EXECUTION_ENVIRONMENT_GEN2"
  }
}
