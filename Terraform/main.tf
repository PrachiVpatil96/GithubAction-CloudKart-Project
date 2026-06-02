resource "azurerm_resource_group" "aks-grp" {

  name     = var.resource_group.name
  location = var.resource_group.location

}

resource "azurerm_kubernetes_cluster" "cluster" {
  name     = var.aks_cluster.name
  location = var.resource_group.location

  resource_group_name = var.resource_group.name
  dns_prefix          = var.aks_cluster.dns_prefix

  default_node_pool {
    name       = var.aks_cluster.node_pool_name
    vm_size    = var.aks_cluster.vm_size
    node_count = var.aks_cluster.node_count
  }

  identity {
    type = var.aks_cluster.identity_type
  }

  tags = {
    environment = var.aks_cluster.environment
  }


}