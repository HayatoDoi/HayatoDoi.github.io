---
layout: top
title: Blog

---
<div class="posts">
{% for post in site.posts %}
  {% if post.private %}
    {% continue %}
  {% endif %}
  <section class="post">
  <header class="post-header">
  <img class="post-avatar" src="/assets/favicon.jpg" alt="/assets/favicon.jpg">
  <h2 class="post-title">
    <a href="{{post.url}}">{{post.title}}</a>
  </h2>
  
  <p class="post-meta">
  By <a class="post-author" href="/about.html">{{site.author.screen_name}}</a>
   under 
  {% for tag in post.tags %}
    <a class="post-category post-category-pure" href="/?tag={{tag | url_encode}}">{{tag}}</a>
  {% endfor %}
  </p>
  <p class="post-meta-right">{{post.date|date_to_long_string}}</p>
  </header>
  
  <div class="post-description">
  <p>{{post.excerpt}}</p>
  </div>
  </section>
{% endfor %}
</div>
