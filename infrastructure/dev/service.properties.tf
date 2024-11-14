variable "container_env" {
  description = "environment variables inside the container"
  type = list(object({
    name  = string
    value = string
  }))
  default = [{
    name  = "ENV"
    value = "DEV"
    }, {
    name  = "STATIC_ENVVAR"
    value = "STATIC VALUE"
    },
    {
      name  = "NEW_VAR"
      value = "HELLO WORLD"
  }]
}
