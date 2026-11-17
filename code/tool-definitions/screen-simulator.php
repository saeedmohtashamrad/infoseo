<?php
return [
    'slug' => 'Webpage-Screen-Resolution-Simulator', 'title' => 'شبیه‌ساز رزولوشن صفحه نمایش', 'icon' => 'monitor-smartphone', 'cat' => 'dev', 'mode' => 'client', 'order' => 44, 'csp' => ['frame-src' => ['https:']],
    'short' => 'نمایش سایت در اندازه‌های موبایل، تبلت و دسکتاپ', 'seo_title' => 'شبیه‌ساز رزولوشن و ریسپانسیو سایت | اینفو سئو',
    'intro' => 'آدرس سایت را وارد کنید و ظاهر آن را در عرض‌های مختلف موبایل، تبلت و دسکتاپ ببینید.',
    'desc' => 'شبیه‌ساز رزولوشن صفحه برای تست ریسپانسیو بودن سایت در اندازه‌های ۳۲۰ تا ۱۹۲۰ پیکسل و حالت افقی و عمودی.',
    'ui' => static function (): string {
        $opts = '';
        foreach ([[320, 568, 'iPhone SE (۳۲۰×۵۶۸)'], [360, 800, 'اندروید کوچک (۳۶۰×۸۰۰)'], [390, 844, 'iPhone 14 (۳۹۰×۸۴۴)'], [430, 932, 'موبایل بزرگ (۴۳۰×۹۳۲)'], [768, 1024, 'تبلت (۷۶۸×۱۰۲۴)'], [1024, 768, 'لپ‌تاپ کوچک (۱۰۲۴×۷۶۸)'], [1440, 900, 'دسکتاپ (۱۴۴۰×۹۰۰)'], [1920, 1080, 'Full HD (۱۹۲۰×۱۰۸۰)']] as [$w, $h, $l]) $opts .= '<option value="' . $w . 'x' . $h . '">' . $l . '</option>';
        return '<form data-tform novalidate><div class="field"><label for="f-url">آدرس سایت</label><input id="f-url" name="url" type="text" dir="ltr" inputmode="url" placeholder="https://example.com" required></div>'
            . '<div class="row2"><div class="field"><label for="f-size">اندازه</label><select id="f-size" name="size">' . $opts . '</select></div><div class="field field--check"><label><input type="checkbox" name="rot"> حالت افقی (Landscape)</label></div></div>'
            . '<div class="tform__act"><button class="btn btn--primary" type="submit"><span class="btn__l">نمایش</span></button></div></form>'
            . '<div class="alert alert--info" style="margin-top:12px">' . icon('info', 18) . '<div>بسیاری از سایت‌ها (از جمله شبکه‌های اجتماعی و بانک‌ها) با هدر X-Frame-Options یا CSP اجازه‌ی نمایش در iframe نمی‌دهند؛ در این صورت کادر خالی یا با پیام خطای مرورگر دیده می‌شود. این محدودیت سمت سایت مقصد است.</div></div>'
            . '<div id="f-stage" class="tscroll" style="margin-top:12px;padding:8px;background:#e2e8f0;border-radius:12px"><div id="f-wrap" style="transform-origin:top right"><iframe id="f-frame" title="پیش‌نمایش سایت" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerpolicy="no-referrer" style="border:0;background:#fff;display:block"></iframe></div></div>';
    },
    'about' => [
        'این ابزار سایت را در یک کادر با ابعاد دلخواه بارگذاری می‌کند تا بدون نیاز به ابزار توسعه‌دهنده ببینید چیدمان در عرض‌های مختلف چگونه است. کادر برای اینکه در صفحه جا شود به‌صورت خودکار کوچک‌نمایی می‌شود.',
        'نمایش، همان رندر واقعی مرورگر شماست، اما شبیه‌ساز لمس، تراکم پیکسل یا User-Agent موبایل نیست؛ برای تست دقیق از DevTools مرورگر استفاده کنید.',
    ],
    'steps' => [['آدرس را وارد کنید', 'آدرس کامل سایت (https) را بنویسید.'], ['اندازه را انتخاب کنید', 'یکی از اندازه‌های آماده یا حالت افقی.'], ['ظاهر را بررسی کنید', 'سرریز افقی، متن‌های کوچک و منوهای شکسته را بررسی کنید.']],
    'faq' => [
        ['چرا سایت من نمایش داده نمی‌شود؟', 'احتمالاً سایت اجازه‌ی نمایش در iframe نمی‌دهد (X-Frame-Options).'],
        ['آیا برای تست سئو کافی است؟', 'برای بررسی چیدمان بله، اما برای سئوی موبایل از تست موبایل‌فرندلی و PageSpeed استفاده کنید.'],
        ['فقط https؟', 'بله؛ برای امنیت فقط آدرس‌های https بارگذاری می‌شوند.'],
    ],
    'related' => ['Mobile-Friendly-Test', 'PageSpeedinsight', 'What-is-my-Browser', 'display-html'],
];
