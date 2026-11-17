<?php
return [
    'slug' => 'Open-Graph-Generator', 'title' => 'ساخت Open Graph و توییتر کارت', 'icon' => 'share-2', 'cat' => 'seo', 'mode' => 'client', 'order' => 13,
    'short' => 'متاتگ‌های OG برای اشتراک‌گذاری زیبا', 'seo_title' => 'ساخت متاتگ Open Graph و Twitter Card | اینفو سئو',
    'intro' => 'عنوان، توضیح و تصویر را وارد کنید تا کد Open Graph برای نمایش زیبا در تلگرام، واتساپ، لینکدین و توییتر ساخته شود.',
    'desc' => 'ابزار رایگان ساخت تگ‌های Open Graph و Twitter Card با پیش‌نمایش کارت اشتراک‌گذاری؛ کد آماده برای قرار دادن در head.',
    'fields' => [
        ['name' => 'title', 'type' => 'text', 'label' => 'عنوان (og:title)', 'required' => true, 'max' => 200],
        ['name' => 'desc', 'type' => 'textarea', 'label' => 'توضیح (og:description)', 'rows' => 3, 'max' => 400],
        ['name' => 'url', 'type' => 'text', 'label' => 'آدرس صفحه (og:url)', 'placeholder' => 'https://example.com/page', 'required' => true],
        ['name' => 'image', 'type' => 'text', 'label' => 'آدرس تصویر (og:image)', 'placeholder' => 'https://example.com/cover.jpg', 'hint' => 'پیشنهاد: ۱۲۰۰×۶۳۰ پیکسل، حداکثر چند صد کیلوبایت.'],
        ['name' => 'site', 'type' => 'text', 'label' => 'نام سایت (og:site_name)'],
        ['name' => 'type', 'type' => 'select', 'label' => 'نوع محتوا', 'options' => [['website', 'website'], ['article', 'article'], ['product', 'product']]],
        ['name' => 'locale', 'type' => 'select', 'label' => 'زبان', 'options' => [['fa_IR', 'fa_IR'], ['en_US', 'en_US'], ['ar_AR', 'ar_AR']]],
    ],
    'button' => 'ساخت کد',
    'about' => [
        'وقتی لینک یک صفحه در پیام‌رسان‌ها و شبکه‌های اجتماعی به اشتراک گذاشته می‌شود، آن‌ها برای ساخت کارت پیش‌نمایش به تگ‌های Open Graph نگاه می‌کنند. تنظیم درست آن‌ها باعث می‌شود لینک شما با تصویر و عنوان مناسب دیده شود و کلیک بیشتری بگیرد.',
        'پس از قرار دادن کد در سایت، می‌توانید با ابزار «بررسی Open Graph» همین صفحه را آنالیز کنید و از درست بودن آن مطمئن شوید.',
    ],
    'steps' => [['فیلدها را پر کنید', 'عنوان، توضیح، آدرس و تصویر را وارد کنید.'], ['پیش‌نمایش کارت را ببینید', 'ظاهر تقریبی اشتراک‌گذاری نمایش داده می‌شود.'], ['کد را در head قرار دهید', 'کد را کپی و در قالب سایت جای‌گذاری کنید.']],
    'faq' => [
        ['تصویر باید چه ابعادی داشته باشد؟', 'نسبت ۱٫۹۱ به ۱ (مثلاً ۱۲۰۰×۶۳۰) برای اغلب پلتفرم‌ها مناسب است.'],
        ['چرا تصویر در تلگرام عوض نمی‌شود؟', 'پیام‌رسان‌ها پیش‌نمایش را کش می‌کنند. پس از تغییر، آدرس را با پارامتر تازه (مثلاً ?v=2) بفرستید.'],
        ['Twitter Card چیست؟', 'نسخه‌ی مشابه OG برای توییتر/X است؛ اگر تگ‌های twitter نباشند معمولاً از OG استفاده می‌شود.'],
    ],
    'related' => ['Open-Graph-Checker', 'Meta-Tag-Generator', 'Meta-Tags-Analyzer'],
];
