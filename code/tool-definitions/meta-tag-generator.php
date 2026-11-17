<?php
return [
    'slug' => 'Meta-Tag-Generator', 'title' => 'ساخت متا تگ سئو', 'icon' => 'tags', 'cat' => 'seo', 'mode' => 'client', 'order' => 12,
    'short' => 'تولید title، description، robots و canonical', 'seo_title' => 'ساخت متا تگ (Meta Tag Generator) فارسی | اینفو سئو',
    'intro' => 'اطلاعات صفحه را وارد کنید و کد متا تگ‌های آماده‌ی سئو را همراه با پیش‌نمایش نتیجه‌ی گوگل دریافت کنید.',
    'desc' => 'ساخت رایگان متا تگ‌های title، description، robots، canonical و viewport با پیش‌نمایش گوگل و هشدار طول مناسب؛ کد آماده برای کپی.',
    'fields' => [
        ['name' => 'title', 'type' => 'text', 'label' => 'عنوان صفحه (Title)', 'required' => true, 'max' => 200],
        ['name' => 'desc', 'type' => 'textarea', 'label' => 'توضیحات متا (Description)', 'rows' => 3, 'max' => 400],
        ['name' => 'url', 'type' => 'text', 'label' => 'آدرس کانونیکال (اختیاری)', 'placeholder' => 'https://example.com/page'],
        ['name' => 'robots', 'type' => 'select', 'label' => 'دستور Robots', 'options' => [['', 'پیش‌فرض (index, follow)'], ['noindex, follow', 'noindex, follow'], ['index, nofollow', 'index, nofollow'], ['noindex, nofollow', 'noindex, nofollow']]],
        ['name' => 'author', 'type' => 'text', 'label' => 'نویسنده (اختیاری)'],
        ['name' => 'lang', 'type' => 'select', 'label' => 'زبان صفحه', 'options' => [['fa', 'فارسی (RTL)'], ['en', 'انگلیسی (LTR)'], ['ar', 'عربی (RTL)']]],
    ],
    'button' => 'ساخت متا تگ',
    'about' => [
        'تگ title و meta description مهم‌ترین بخش‌هایی هستند که کاربر در نتایج گوگل از صفحه‌ی شما می‌بیند. عنوان خوب باعث افزایش نرخ کلیک می‌شود و توضیحات خوب موضوع صفحه را روشن می‌کند.',
        'این ابزار علاوه بر تولید کد، طول عنوان و توضیحات را بررسی می‌کند. گوگل دقیقاً بر اساس تعداد کاراکتر عنوان را نمی‌برد، بلکه بر اساس عرض پیکسلی؛ پس اعداد، راهنمای تقریبی هستند.',
    ],
    'steps' => [['اطلاعات را وارد کنید', 'عنوان و توضیحات صفحه را بنویسید.'], ['پیش‌نمایش را بررسی کنید', 'نمایش در نتایج گوگل و هشدارهای طول را ببینید.'], ['کد را کپی کنید', 'کد را داخل بخش <head> صفحه قرار دهید.']],
    'faq' => [
        ['آیا meta keywords لازم است؟', 'خیر؛ گوگل سال‌هاست meta keywords را نادیده می‌گیرد و این ابزار آن را تولید نمی‌کند.'],
        ['اگر description ننویسم چه می‌شود؟', 'گوگل خودش بخشی از متن صفحه را نمایش می‌دهد؛ ولی نوشتن توضیحات اختصاصی کنترل بیشتری به شما می‌دهد.'],
        ['کانونیکال چه کاربردی دارد؟', 'برای معرفی آدرس اصلی صفحه به موتور جستجو و جلوگیری از محتوای تکراری با پارامترهای مختلف.'],
    ],
    'related' => ['Open-Graph-Generator', 'Meta-Tags-Analyzer', 'Robots.txt-Generator', 'Word-Counter'],
];
