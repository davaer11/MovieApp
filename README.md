UPUTE ZA POKRETANJE APLIKACIJE U DEVELOPMENT NAČINU RADA: 
------------------------------------------------------------------------------------------------------------
1. Odite u terminal i pozicionirajte se u datoteku gdje želite klonirati projekt 
2. Komanda za kloniranje projekta: git clone https://github.com/davaer11/MovieApp.git
3. U svom IDE-u učitajte klonirani projekt i obrišite datoteku package-lock.json
4. Otvorite terminal u IDE-u i upišite: npm install (instalira potrebne module i package-lock.json datoteku)
5. Kreirajte .env datoteku i koristeći .env.template datoteku upišite vaš API_KEY kojim pristupate TMDB-u
6. U terminalu upišite: npm start (to bi trebalo pokrenuti aplikaciju na http://localhost:3000/)