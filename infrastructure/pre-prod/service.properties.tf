variable "container_env" {
  description = "environment variables inside the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = [{
    name  = "ENV"
    value = "PRE_PROD"
    }, {
    name  = "STATIC_ENVVAR"
    value = "STATIC VALUE"
  }]
}
