resource "google_cloud_scheduler_job" "scheduler" {
  name      = var.name
  schedule  = "0 0 * * *"
  time_zone = "America/New_York"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "GET"
    uri         = var.uri
    oidc_token {
      service_account_email = var.service_account_email
      audience              = var.audience
    }
  }
}
