
output "service_uri" {
  description = "URI endpoint of the service"
  value       = google_cloud_run_v2_service.service.uri
}
