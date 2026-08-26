# Dokploy ile yayına alma

Depo: `grxtor/rubbletalk-landing` (private)
Derleme: kök dizindeki `Dockerfile` (Node ile derler, nginx ile sunar)

## 1. Private depo erişimi

Depo private olduğu için Dokploy'un GitHub'a bağlanması gerekiyor.

Dokploy paneli → **Settings → Git → GitHub → Install GitHub App**
Kurulum sırasında `rubbletalk-landing` deposuna erişim ver.

## 2. Uygulamayı oluştur

1. **Projects → Create Project** (ör. `rubbletalk`)
2. Proje içinde **Create Service → Application**
3. **Provider: GitHub**
   - Repository: `grxtor/rubbletalk-landing`
   - Branch: `main`
4. **Build Type: Dockerfile**
   - Dockerfile Path: `Dockerfile`
   - Build Context: `.`

## 3. Domain

**Domains → Add Domain**

| Alan | Değer |
|---|---|
| Host | `rubbletalk.<IP-tireli>.sslip.io` |
| Path | `/` |
| Container Port | **80** |
| HTTPS | açık |
| Certificate | Let's Encrypt |

`<IP-tireli>` sunucunun IP'sindeki noktaların tireye çevrilmiş hali.
Örnek: IP `203.0.113.45` ise host `rubbletalk.203-0-113-45.sslip.io` olur.

sslip.io kayıt gerektirmez; IP'yi adresin içinde taşır ve doğrudan o IP'ye
çözümlenir. DNS ayarı yapmana gerek yok.

## 4. Deploy

**Deploy** düğmesi. İlk derleme birkaç dakika sürer (pnpm install + vite build).

## 5. Otomatik deploy

Uygulamanın **Deployments** sekmesindeki webhook URL'ini
GitHub → repo → Settings → Webhooks içine ekle.
Bundan sonra `main` dalına her push yeniden deploy tetikler.

## Kendi domainine geçerken

1. DNS panelinde A kaydı: `@` veya `www` → sunucu IP'si
2. Dokploy → Domains → mevcut domaini düzenle ya da ikincisini ekle
3. Certificate: Let's Encrypt (DNS yayılması tamamlandıktan sonra)

## Notlar

- Video byte-range istekleriyle çekiliyor; `deploy/nginx.conf` bunu bozacak bir
  ayar içermiyor. Araya ek bir proxy koyarsan range desteğini kapatma.
- `dist/` depoya dahil değil, derleme imaj içinde yapılıyor.
- Konteyner 80 portunu dinliyor; Dokploy'da Container Port 80 olmalı.
