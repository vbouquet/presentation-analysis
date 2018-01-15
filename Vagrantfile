Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.hostname = "psi"
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 8000, host: 8000


  config.vm.provider :virtualbox do |vb|
        vb.name = "psi"
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
        vb.memory = "2048"
        vb.cpus = "2"
  end

  config.vm.provision 'shell', path: 'scripts/install.sh'
  config.vm.provision 'shell', path: 'scripts/install_front_end.sh'
  config.vm.provision 'shell', path: 'scripts/install_django_server.sh'
  config.vm.provision 'shell', path: 'scripts/install_opencv.sh'
  config.vm.provision 'shell', path: 'scripts/install_clean.sh'

end
