resource "azurerm_resource_group" "aks-grp" {

  name     = "aks-rg"
  location = "centralus"

}

resource "azurerm_kubernetes_cluster" "cluster" {
  name     = "my-aks-cluster"
  location = azurerm_resource_group.aks-grp.location

  resource_group_name = azurerm_resource_group.aks-grp.name
  dns_prefix          = "my-aks-cluster"

  default_node_pool {
    name       = "workernode"
    vm_size    = "Standard_B1s"
    node_count = 1
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "dev"
  }


}