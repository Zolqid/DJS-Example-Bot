import chalk from 'chalk';
import moment from 'moment';
import 'moment/locale/tr.js';

moment.locale('tr');

export default async function onReady(client) {
    const zaman = moment().format('LL - LTS');

    console.log(chalk.magentaBright(`\n🔌 ${zaman} | Bot aktif: ${client.user.tag}`));
    console.log(chalk.blueBright(`🌐 Sunucu sayısı: ${client.guilds.cache.size}`));
    console.log(chalk.greenBright('✅ Hazır, komutlar ve eventler başarıyla yüklendi.\n'));
}
