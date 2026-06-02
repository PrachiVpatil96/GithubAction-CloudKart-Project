resource_group = {
  name = "cloudkart-rg"
  location = "centralus"
}

aks_cluster = {
  name           = "cloudcart-Cluster"
  dns_prefix     = "cloudcart-cluster"
  node_pool_name = "workernode"
  vm_size        = "Standard_B1s"
  node_count     = 1
  identity_type  = "SystemAssigned"
  environment    = "dev"
}