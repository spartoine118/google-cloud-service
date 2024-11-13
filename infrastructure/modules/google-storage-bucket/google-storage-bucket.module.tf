resource "google_storage_bucket" "storage" {
  name     = var.name
  location = var.location

  force_destroy               = true
  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}
