module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        "vue"
    ],
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|svg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/*.{js,vue}",
        "src/pages/*.{js,vue}",
        "!**/node_modules/**"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    globals: {
        "vue-jest": {
            "experimentalCSSCompile": false
        }
    }
}
