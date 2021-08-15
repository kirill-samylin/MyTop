module.exports = {
    images: {
        domains: ['courses-top.ru']
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/, //Если мы видим файл свг
            issuer: { //в файла дж, тс, или тсх, 
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'], //то мы с вами используем специальный загрузчик svgr 
        });
        return config;
    },
};