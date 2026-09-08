# Trasformare LiFa in APK Android — solo dal sito GitHub, senza terminale

## 1. Carica i file nel repo
Vai sul repo `Liste-Famiglia` su github.com → **Add file → Upload files**, e carica (mantenendo le sottocartelle):
- `package.json`
- `capacitor.config.json`
- `.github/workflows/bootstrap-android.yml`
- `.github/workflows/build-apk.yml`

(il contenuto di `gitignore-da-aggiungere.txt` incollalo dentro il tuo `.gitignore` esistente, se lo apri e lo modifichi direttamente da GitHub; se non hai un `.gitignore`, carica quel file rinominandolo in `.gitignore`)

Fai commit direttamente su `main`.

## 2. Attiva le Action (se GitHub te lo chiede)
Vai sulla tab **Actions** del repo. Se GitHub mostra un banner per abilitare le Action, clicca per abilitarle.

Poi vai su **Settings → Actions → General**, scorri fino a "Workflow permissions" e seleziona **"Read and write permissions"**, poi salva. (Serve perché il primo workflow deve poter scrivere nel repo la cartella Android generata.)

## 3. Esegui il bootstrap (una volta sola)
Sempre nella tab **Actions**, nella lista a sinistra clicca su **"Bootstrap Android (una tantum)"**, poi in alto a destra clicca **"Run workflow"** → **Run workflow**.

Aspetta un paio di minuti: quando diventa verde ✅, guarda nel repo — troverai una nuova cartella `android/` comparsa da sola, con dentro tutto il progetto Android.

## 4. Da qui in poi è automatico
Ogni volta che modifichi `index.html` (o altro) e fai commit su `main`, parte da solo il workflow **"Build APK"**, che compila l'app. Dopo qualche minuto vai su **Releases** (nella pagina principale del repo, colonna destra) e trovi **"LiFa (ultima build)"** con allegato `app-debug.apk` da scaricare e installare sul telefono.

## Nota
Il bootstrap (punto 3) va rifatto solo se in futuro cambi drasticamente configurazione Capacitor — nell'uso normale non dovrai più toccarlo.
