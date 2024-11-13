
variable "image_name" {
  description = "image name"
  type        = string
  nullable    = false
}

variable "name" {
  type     = string
  nullable = false
}

variable "location" {
  type     = string
  nullable = false
}

variable "service_account" {
  type      = string
  nullable  = false
  sensitive = true
}
