---
layout: post
date: 2018-11-22
title: systemd-bootを使ってArchLinuxを起動する
tags: [archlinux, arch linux, GPT, systemd-boot]
excerpt : systemd-bootを使ってArchLinuxを起動方法をまとめておきます。

---

## systemd-bootとは
systemdに同梱されているUEFIブートマネージャです。ですので、ArchLinuxでは追加のパッケージを入れることなく使うことができます。

## systemd-boot vs grub2
一言で言うとsystemd-bootはシンプルで低機能、grub2は複雑で高機能です。迷ったらgrub2でいいと思います。情報が豊富ですし。

## systemd-boot
