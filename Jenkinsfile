pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        DOCKER_BUILDKIT = '1'

        REGISTRY = 'mirai-server.net:56789'
        NAMESPACE = 'prod'
        IMAGE_NAME = 'myblog-web'
        IMAGE_TAG = "${BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}"

        DOCKER_CREDENTIALS_ID = 'harbor-credential'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build production image') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'myblog-web-env-production',
                        variable: 'WEB_ENV_PRODUCTION'
                    )
                ]) {
                    sh '''
                        docker build \
                          --secret id=web_env_production,src="$WEB_ENV_PRODUCTION" \
                          --file apps/web/Dockerfile \
                          --tag "$FULL_IMAGE_NAME:$IMAGE_TAG" \
                          .
                    '''
                }
            }
        }

        stage('Push image to Harbor') {
            steps {
                script {
                    docker.withRegistry(
                        "http://${env.REGISTRY}",
                        env.DOCKER_CREDENTIALS_ID
                    ) {
                        def image = docker.image(
                            "${env.FULL_IMAGE_NAME}:${env.IMAGE_TAG}"
                        )

                        image.push()

                        if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'main') {
                            image.push('latest')
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Built and pushed Docker image: ${env.FULL_IMAGE_NAME}:${env.IMAGE_TAG}"
        }
        failure {
            echo 'Docker image build or Harbor push failed. Check the Jenkins logs.'
        }
        always {
            cleanWs()
        }
    }
}
