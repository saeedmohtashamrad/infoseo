<?php
return [
    'slug' => 'XML-Sitemap-Generator', 'title' => 'ساخت نقشه سایت XML', 'icon' => 'network', 'cat' => 'seo', 'mode' => 'client', 'order' => 15,
    'short' => 'ساخت sitemap.xml از فهرست آدرس‌ها', 'seo_title' => 'ساخت نقشه سایت XML (sitemap.xml) آنلاین | اینفو سئو',
    'intro' => 'فهرست آدرس صفحات را وارد کنید و فایل sitemap.xml استاندارد را بسازید.',
    'desc' => 'تولید رایگان فایل sitemap.xml از لیست آدرس‌ها با تنظیم lastmod، changefreq و priority؛ دانلود مستقیم و اعتبارسنجی آدرس‌ها.',
    'fields' => [
        ['name' => 'urls', 'type' => 'textarea', 'label' => 'آدرس صفحات (هر خط یک آدرس کامل)', 'rows' => 8, 'required' => true, 'placeholder' => "https://example.com/\nhttps://example.com/about"],
        ['name' => 'lastmod', 'type' => 'checkbox', 'label' => 'افزودن تاریخ امروز به‌عنوان lastmod', 'default' => true],
        ['name' => 'freq', 'type' => 'select', 'label' => 'changefreq', 'options' => [['', 'بدون ذکر'], ['daily', 'daily'], ['weekly', 'weekly'], ['monthly', 'monthly'], ['yearly', 'yearly']]],
        ['name' => 'prio', 'type' => 'select', 'label' => 'priority', 'options' => [['', 'بدون ذکر'], ['1.0', '1.0'], ['0.8', '0.8'], ['0.5', '0.5']]],
    ],
    'button' => 'ساخت sitemap.xml',
    'about' => [
        'نقشه‌ی سایت XML فهرستی از صفحات مهم سایت است که به موتورهای جستجو کمک می‌کند آن‌ها را سریع‌تر پیدا کنند. این ابزار آدرس‌هایی را که شما وارد می‌کنید بررسی و به فرمت استاندارد sitemaps.org تبدیل می‌کند.',
        'گوگل مقدار changefreq و priority را نادیده می‌گیرد و فقط به lastmod دقیق توجه می‌کند؛ پس اگر تاریخ آخرین تغییر واقعی را ندارید، بهتر است lastmod را حذف کنید.',
    ],
    'steps' => [['آدرس‌ها را وارد کنید', 'هر آدرس را در یک خط بنویسید.'], ['گزینه‌ها را تنظیم کنید', 'lastmod و دیگر تنظیمات را انتخاب کنید.'], ['فایل را آپلود و ثبت کنید', 'فایل را در ریشه‌ی سایت بگذارید و در Search Console ثبت کنید.']],
    'faq' => [
        ['حداکثر چند آدرس مجاز است؟', 'هر فایل sitemap حداکثر ۵۰٬۰۰۰ آدرس و ۵۰ مگابایت؛ این ابزار تا ۵٬۰۰۰ آدرس را می‌پذیرد.'],
        ['سایت من وردپرسی است؛ نیاز دارم؟', 'افزونه‌های سئو معمولاً sitemap خودکار می‌سازند. این ابزار برای سایت‌های استاتیک و سفارشی مناسب است.'],
        ['آدرس‌های نامعتبر چه می‌شوند؟', 'آدرس‌های غیر http/https نادیده گرفته و در گزارش اعلام می‌شوند.'],
    ],
    'related' => ['Robots.txt-Generator', 'Meta-Tag-Generator', 'URL-Rewriting-Tool'],
];
