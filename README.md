## Kaiso Assistant  
A web app with basic voice-assistant features designed for smartwatch, created with offline-first (TTS/SR) approach.  
Requirements:  
- Chromium 80+  
- Android 5.0+
- [Google app](https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox) (with speech recognition offline packages)  
- [Google TTS](https://play.google.com/store/apps/details?id=com.google.android.tts) (with speech synthesis offline packages, try older versions if you face troubles with downloads)  

Features:  
- [x] Current time  
- [x] Current battery level  
- [x] Notes  
- [X] Reminders  (currently only under the [flag](https://web.dev/notification-triggers/#enabling-via-chrome:flags))
- [ ] Exchange rates & currency convertion  
- [x] Basic answers  
- [ ] Background-fetch-based events ?  

Limitations:  
- No NLP, only hardcoded phrases  

Configuration:  
- You can change default language in config.js
