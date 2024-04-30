pipeline {
    agent any

    stages {
        stage('Check Environment') {
            steps {
                script {
                    echo 'Checking current working directory...'
                    sh('pwd') // Where am I?
                    echo 'Checking Git status...'
                    sh('git status') // What is the current situation of the local repository?
                    echo 'Checking Git remote configuration...'
                    sh('git remote -v') // What is the remote (upstream) repository?
                }
            }
        }

        stage('Checkout Repository') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 14') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withTool('ms-docker') {
                        def appImage = docker.build('hafizjamil/ms:latest')
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        docker.withTool('ms-docker') {
                            def appImage = docker.image('hafizjamil/ms:latest')
                            appImage.push()
                        }
                    }
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                sh 'git checkout master'
                sh 'sed -i "s/hafizjamil/ms:old-tag/hafizjamil/ms:latest/g" manifest/deployment.yaml'
                sh 'git add manifest/deployment.yaml'
                sh 'git commit -m "Update image tag to latest"'
                sh 'git push origin master'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}