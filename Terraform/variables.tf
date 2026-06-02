variable "resource_group" {
  type = object({
    name     = string
    location = string
  })

  description = "Resource-grp description"

}

variable "aks_cluster" {
  type = object({
    name           = string
    dns_prefix     = string
    node_pool_name = string
    vm_size        = string
    node_count     = number
    identity_type  = string
    environment    = string
  })
  description = "Aks_cluster_info"
}