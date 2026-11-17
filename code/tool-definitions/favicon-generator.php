<?php
return [
    'slug' => 'Favicon-Generator-Tool', 'title' => 'ساخت فاوآیکن (Favicon)', 'icon' => 'badge-check', 'cat' => 'media', 'mode' => 'client', 'order' => 83,
    'short' => 'ساخت آیکن سایت در اندازه‌های لازم', 'seo_title' => 'ساخت فاوآیکن و favicon.ico از عکس | اینفو سئو',
    'intro' => 'یک تصویر مربعی بدهید تا آیکن‌های ۱۶ تا ۵۱۲ پیکسل، فایل ICO و کد HTML آماده را بگیرید.',
    'desc' => 'ساخت رایگان فاوآیکن: تولید PNG در اندازه‌های ۱۶، ۳۲، ۴۸، ۱۸۰، ۱۹۲ و ۵۱۲، فایل favicon.ico و کد head و manifest؛ همه در مرورگر.',
    'ui' => static function (): string {
        return '<form data-tform novalidate><div class="field"><label for="f-img">تصویر (ترجیحاً مربعی و حداقل ۵۱۲ پیکسل)</label><input id="f-img" name="img" type="file" accept="image/png,image/jpeg,image/webp" required></div>'
            . '<div class="field"><label for="f-bg">پس‌زمینه‌ی ناحیه‌ی خالی</label><select id="f-bg" name="bg"><option value="transparent">شفاف</option><option value="#ffffff">سفید</option><option value="#000000">سیاه</option></select></div>'
            . '<div class="tform__act"><button class="btn btn--primary" type="submit"><span class="btn__l">ساخت آیکن‌ها</span></button></div></form>';
    },
    'about' => [
        'مرورگرها و موتورهای جستجو از فاوآیکن در تب، بوکمارک و نتایج جستجوی موبایل استفاده می‌کنند. گوگل توصیه می‌کند آیکن مربعی و مضربی از ۴۸ پیکسل باشد. این ابزار تصویر شما را در اندازه‌های لازم می‌سازد و فایل ICO چندسایزه (۱۶، ۳۲ و ۴۸) تولید می‌کند.',
        'پس از دانلود، فایل‌ها را در ریشه‌ی سایت بگذارید و کد پیشنهادی را داخل head قرار دهید.',
    ],
    'steps' => [['تصویر را انتخاب کنید', 'لوگوی مربعی و واضح انتخاب کنید.'], ['آیکن‌ها را بسازید', 'همه‌ی اندازه‌ها در مرورگر ساخته می‌شود.'], ['فایل‌ها را آپلود کنید', 'در ریشه‌ی سایت قرار دهید و کد head را اضافه کنید.']],
    'faq' => [
        ['تصویر آپلود می‌شود؟', 'خیر.'],
        ['فرمت SVG چه؟', 'این ابزار PNG/ICO می‌سازد؛ اگر SVG دارید می‌توانید مستقیم با <link rel="icon" type="image/svg+xml"> استفاده کنید.'],
        ['چرا آیکن جدید دیده نمی‌شود؟', 'مرورگرها فاوآیکن را کش می‌کنند؛ پس از چند ساعت یا با پاک‌کردن کش تغییر دیده می‌شود.'],
    ],
    'related' => ['Image-Optimizer', 'Open-Graph-Generator', 'Color-Picker'],
];
