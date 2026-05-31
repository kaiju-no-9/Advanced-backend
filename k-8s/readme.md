Locally (Make sure you have docker)

minukube

kind - https://kind.sigs.k8s.io/docs/user/quick-start/

On cloud
GKE
AWS K8s
vultr
Using kind

Install kind - https://kind.sigs.k8s.io/docs/user/quick-start/#installation
Single node setup
Create a 1 node cluster

<bash>
kind create cluster --name local

</bash>
Check the docker containers you have running

<bash>
docker ps
</bash>

You will notice a single container running (control-pane)
Delete the cluster
kind delete cluster -n local

Multi node setup
Create a clusters.yml file
<bash>
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
</bash>

Create the node setup
<bash>
 kind create cluster --config clusters.yml --name local
</bash>


Check docker containers
<bash>
docker ps
</bash>

notion image
 
Now you have a node cluster running locally
Using minikube
 
Install minikube - https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Fx86-64%2Fstable%2Fbinary+download
Start a k8s cluster locally
minikube start

Run docker ps to see the single node setup
 
💡
A single node setup works but is not ideal. You don’t want your control pane to run containers/act as a worker.