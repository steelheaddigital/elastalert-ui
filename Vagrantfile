VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.synced_folder ".", "/vagrant", type: "nfs", mount_options: ['rw', 'vers=3', 'tcp', 'fsc' ,'actimeo=1']
  config.vm.network :private_network, ip: "192.168.11.3"
  config.vm.provision :docker
  config.vm.provision "shell", inline: <<-SCRIPT
    apt-get -y install linux-image-extra-$(uname -r)
    usermod -aG docker vagrant
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.config
    sudo sysctl -p
  SCRIPT
  config.vm.provision :docker_compose,
    yml: [
      "/vagrant/docker-compose.yml",
      "/vagrant/docker-compose.override.yml"
    ],
    run: "always"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 2048
    vb.cpus = 2
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "75"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end
end