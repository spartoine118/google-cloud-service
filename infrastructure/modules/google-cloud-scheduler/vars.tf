variable "name" {
  type     = string
  nullable = false
}

variable "uri" {
  type      = string
  nullable  = false
  sensitive = true
}

variable "service_account_email" {
  type      = string
  nullable  = false
  sensitive = true
}

variable "audience" {
  type      = string
  nullable  = false
  sensitive = true
}
