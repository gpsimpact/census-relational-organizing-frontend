require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withTypescript = require('@zeit/next-typescript')
const withImages = require('next-images');

module.exports = withImages(withTypescript({
    webpack(config, options) {
        config.plugins = config.plugins || []

        config.plugins = [
          ...config.plugins,
    
          // Read the .env file
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true
          })
        ]

      return config
    }
  }))
