#include <stdio.h>
#include <string.h>

// ============================================================
// Klasy bazowe z poprzednich laboratorjów (Samochod, SamochodOsobowy, SamochodCiezarowy)
// ============================================================

class Samochod {
protected:
    double cena;
    char rodzaj_silnika[50];
    Samochod *nast;

public:
    Samochod() : cena(0.0), nast(nullptr) {
        strcpy(rodzaj_silnika, "nieznany");
    }

    Samochod(double c, const char *s) : nast(nullptr) {
        setCena(c);
        setRodzajSilnika(s);
    }

    Samochod(const Samochod &s) : cena(s.cena), nast(nullptr) {
        strcpy(rodzaj_silnika, s.rodzaj_silnika);
    }

    virtual ~Samochod() {}

    double getCena() const { return cena; }
    const char *getRodzajSilnika() const { return rodzaj_silnika; }

    void setCena(double p_cena) {
        cena = (p_cena >= 0) ? p_cena : 0.0;
    }

    void setRodzajSilnika(const char *p_silnik) {
        strncpy(rodzaj_silnika, p_silnik, 49);
        rodzaj_silnika[49] = '\0';
    }

    virtual void wypisz() const {
        printf("Samochod: cena=%.0f PLN, silnik=%s\n", cena, rodzaj_silnika);
    }

    void setNast(Samochod *s) { nast = s; }
    Samochod *getNast() const { return nast; }
};

class SamochodOsobowy : public Samochod {
protected:
    int pojemnosc_bagaznika;
    char typ_sylwetki;

public:
    SamochodOsobowy() : Samochod(), pojemnosc_bagaznika(0), typ_sylwetki('N') {}

    SamochodOsobowy(const SamochodOsobowy &v)
        : Samochod(v), pojemnosc_bagaznika(v.pojemnosc_bagaznika), typ_sylwetki(v.typ_sylwetki) {}

    SamochodOsobowy(double cena, int pojemnosc_bagaznika, char typ_sylwetki)
        : Samochod(cena, "silnik osobowy"),
          pojemnosc_bagaznika(pojemnosc_bagaznika),
          typ_sylwetki(typ_sylwetki) {}

    ~SamochodOsobowy() {}

    void wypisz() const override {
        printf("SamochodOsobowy: cena=%.0f PLN, silnik=%s, bagaznik=%d L, sylwetka=%c\n",
               cena, rodzaj_silnika, pojemnosc_bagaznika, typ_sylwetki);
    }

    void setPojemnoscBagaznika(int v) { pojemnosc_bagaznika = (v >= 0) ? v : pojemnosc_bagaznika; }
    int getPojemnoscBagaznika() { return pojemnosc_bagaznika; }

    void setTypSylwetki(char v) {
        typ_sylwetki = (v == 'H' || v == 'S' || v == 'K' || v == 'V') ? v : typ_sylwetki;
    }
    char getTypSylwetki() { return typ_sylwetki; }
};

class SamochodCiezarowy : public Samochod {
protected:
    double maksymalna_ladownosc;
    int liczba_kol;

public:
    SamochodCiezarowy() : Samochod(), maksymalna_ladownosc(0.0), liczba_kol(0) {}

    SamochodCiezarowy(const SamochodCiezarowy &v)
        : Samochod(v), maksymalna_ladownosc(v.maksymalna_ladownosc), liczba_kol(v.liczba_kol) {}

    SamochodCiezarowy(double cena, double maks_ladownosc, int l_kol)
        : Samochod(cena, "silnik ciezarowy"),
          maksymalna_ladownosc(maks_ladownosc),
          liczba_kol(l_kol) {}

    ~SamochodCiezarowy() {}

    void wypisz() const override {
        printf("SamochodCiezarowy: cena=%.0f PLN, silnik=%s, ladownosc=%.0f kg, kola=%d\n",
               cena, rodzaj_silnika, maksymalna_ladownosc, liczba_kol);
    }

    void setMaksymalnaLadownosc(double v) { maksymalna_ladownosc = (v >= 0) ? v : maksymalna_ladownosc; }
    double getMaksymalnaLadownosc() const { return maksymalna_ladownosc; }

    void setLiczbaKol(int v) { liczba_kol = (v >= 0) ? v : liczba_kol; }
    int getLiczbaKol() const { return liczba_kol; }
};

// ============================================================
// KROK 1 – Klasa abstrakcyjna MenedzerSamochodow
// ============================================================
// Cztery czysto wirtualne metody:
//   1. wczytaj()        – wczytanie obiektów do listy
//   2. wypisz()         – wypisanie całej listy (ustawia stan EOL po zakończeniu)
//   3. wypiszPierwszy() – wypisanie głowy listy; zwraca true gdy lista jest jednoelementowa
//                         (lub pusta), false gdy są jeszcze kolejne elementy
//   4. wypiszNastepny() – przesuwa wskaźnik i wypisuje aktualny element;
//                         zwraca true gdy osiągnięto koniec listy, false w przeciwnym razie

class MenedzerSamochodow {
public:
    virtual ~MenedzerSamochodow() {}

    // Działanie 1 – wczytanie danych do listy
    virtual void wczytaj() = 0;

    // Działanie 2 – wypisanie całej listy; po zakończeniu stan EOL
    virtual void wypisz() = 0;

    // Działanie 3 – wypisanie pierwszego elementu; ustawia aktualny na głowę
    // Zwraca: false – są jeszcze elementy, true – lista pusta lub jednoelementowa (koniec)
    virtual bool wypiszPierwszy() = 0;

    // Działanie 4 – przesuwa aktualny o 1 i wypisuje; gdy EOL wypisuje komunikat
    // Zwraca: false – są jeszcze elementy, true – osiągnięto koniec listy
    virtual bool wypiszNastepny() = 0;
};

// ============================================================
// KROK 2 – Klasa pośrednia MenedzerBaza
//          Implementuje wypisz(), wypiszPierwszy(), wypiszNastepny().
//          Metoda wczytaj() pozostaje niezaimplementowana (czysto wirtualna).
// ============================================================

class MenedzerBaza : public MenedzerSamochodow {
protected:
    Samochod *glowa;     // wskaźnik na pierwszy element listy
    Samochod *aktualny;  // wskaźnik na aktualnie wskazywany element (do metod 3 i 4)
    bool eol;            // true gdy aktualny osiągnął koniec listy (stan EOL)

public:
    MenedzerBaza() : glowa(nullptr), aktualny(nullptr), eol(false) {}

    virtual ~MenedzerBaza() {
        // Zwolnienie całej listy dynamicznej
        Samochod *wsk = glowa;
        while (wsk) {
            Samochod *tmp = wsk->getNast();
            delete wsk;
            wsk = tmp;
        }
        glowa = nullptr;
        aktualny = nullptr;
    }

    // Działanie 1 – pozostaje czysto wirtualne w tej klasie
    virtual void wczytaj() = 0;

    // Działanie 2 – wypisuje całą listę; ustawia stan EOL po zakończeniu
    void wypisz() override {
        if (glowa == nullptr) {
            printf("[Lista jest pusta]\n");
        } else {
            Samochod *wsk = glowa;
            while (wsk != nullptr) {
                wsk->wypisz();
                wsk = wsk->getNast();
            }
        }
        // Po zakończeniu – stan EOL
        aktualny = nullptr;
        eol = true;
    }

    // Działanie 3 – ustawia aktualny na głowę i wypisuje pierwszy element
    bool wypiszPierwszy() override {
        if (glowa == nullptr) {
            printf("[Lista jest pusta]\n");
            aktualny = nullptr;
            eol = true;
            return true; // koniec (lista pusta)
        }
        aktualny = glowa;
        eol = false;
        aktualny->wypisz();
        // Jeżeli to jedyny element – zwróć true (koniec)
        if (aktualny->getNast() == nullptr) {
            return true;
        }
        return false;
    }

    // Działanie 4 – przesuwa aktualny o jeden wprzód i wypisuje
    bool wypiszNastepny() override {
        // Jeżeli jesteśmy w stanie EOL lub metoda 3 nie była wywołana
        if (eol || aktualny == nullptr) {
            printf("Nie ma wiecej elementow na liscie.\n");
            eol = true;
            return true;
        }
        aktualny = aktualny->getNast();
        if (aktualny == nullptr) {
            printf("Nie ma wiecej elementow na liscie.\n");
            eol = true;
            return true;
        }
        aktualny->wypisz();
        // Sprawdź czy to ostatni element
        if (aktualny->getNast() == nullptr) {
            return true;
        }
        return false;
    }

protected:
    // Pomocnicza metoda do dodawania elementu na koniec listy – używana przez klasy pochodne
    void dodajNaKoniec(Samochod *nowy) {
        if (glowa == nullptr) {
            glowa = nowy;
        } else {
            Samochod *wsk = glowa;
            while (wsk->getNast() != nullptr) {
                wsk = wsk->getNast();
            }
            wsk->setNast(nowy);
        }
    }
};

// ============================================================
// KROK 3a – KontenerZPliku
//           Wczytuje obiekty z pliku tekstowego do listy
// ============================================================

class KontenerZPliku : public MenedzerBaza {
private:
    char nazwa_pliku[256];

public:
    KontenerZPliku(const char *plik) {
        strncpy(nazwa_pliku, plik, 255);
        nazwa_pliku[255] = '\0';
    }

    // Działanie 1 – wczytanie z pliku
    // Format pliku (tak jak w kodzie wejściówki):
    //   0 <cena> <rodzaj_silnika>
    //   1 <cena> <rodzaj_silnika> <pojemnosc_bagaznika> <typ_sylwetki>
    //   2 <cena> <rodzaj_silnika> <ladownosc> <liczba_kol>
    void wczytaj() override {
        FILE *f = fopen(nazwa_pliku, "r");
        if (!f) {
            printf("Blad: nie mozna otworzyc pliku '%s'\n", nazwa_pliku);
            return;
        }

        int typ;
        while (fscanf(f, "%d", &typ) == 1) {
            switch (typ) {
                case 0: {
                    int cena;
                    char silnik[50];
                    fscanf(f, "%d %s", &cena, silnik);
                    Samochod *nowy = new Samochod();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    dodajNaKoniec(nowy);
                    break;
                }
                case 1: {
                    int cena, pojemnosc;
                    char silnik[50];
                    char sylwetka;
                    fscanf(f, "%d %s %d %c", &cena, silnik, &pojemnosc, &sylwetka);
                    SamochodOsobowy *nowy = new SamochodOsobowy();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    nowy->setPojemnoscBagaznika(pojemnosc);
                    nowy->setTypSylwetki(sylwetka);
                    dodajNaKoniec(nowy);
                    break;
                }
                case 2: {
                    int cena, kola;
                    char silnik[50];
                    double ladownosc;
                    fscanf(f, "%d %s %lf %d", &cena, silnik, &ladownosc, &kola);
                    SamochodCiezarowy *nowy = new SamochodCiezarowy();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    nowy->setMaksymalnaLadownosc(ladownosc);
                    nowy->setLiczbaKol(kola);
                    dodajNaKoniec(nowy);
                    break;
                }
                default:
                    printf("Nieznany typ obiektu: %d – pomijam.\n", typ);
                    break;
            }
        }

        fclose(f);
    }
};

// ============================================================
// KROK 3b – KontenerZKonsoli
//           Wczytuje obiekty z danych podanych przez użytkownika w konsoli
// ============================================================

class KontenerZKonsoli : public MenedzerBaza {
public:
    KontenerZKonsoli() {}

    // Działanie 1 – wczytanie z konsoli
    void wczytaj() override {
        printf("=== Wczytywanie danych z konsoli ===\n");
        printf("Dostepne typy: 0=Samochod, 1=SamochodOsobowy, 2=SamochodCiezarowy, -1=koniec\n");

        int typ;
        while (true) {
            printf("Podaj typ obiektu: ");
            scanf("%d", &typ);
            if (typ == -1) break;

            switch (typ) {
                case 0: {
                    double cena;
                    char silnik[50];
                    printf("  Cena: ");
                    scanf("%lf", &cena);
                    printf("  Rodzaj silnika: ");
                    scanf("%s", silnik);
                    Samochod *nowy = new Samochod();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    dodajNaKoniec(nowy);
                    break;
                }
                case 1: {
                    double cena;
                    char silnik[50];
                    int pojemnosc;
                    char sylwetka;
                    printf("  Cena: ");
                    scanf("%lf", &cena);
                    printf("  Rodzaj silnika: ");
                    scanf("%s", silnik);
                    printf("  Pojemnosc bagaznika (L): ");
                    scanf("%d", &pojemnosc);
                    printf("  Typ sylwetki (H/S/K/V): ");
                    scanf(" %c", &sylwetka);
                    SamochodOsobowy *nowy = new SamochodOsobowy();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    nowy->setPojemnoscBagaznika(pojemnosc);
                    nowy->setTypSylwetki(sylwetka);
                    dodajNaKoniec(nowy);
                    break;
                }
                case 2: {
                    double cena, ladownosc;
                    char silnik[50];
                    int kola;
                    printf("  Cena: ");
                    scanf("%lf", &cena);
                    printf("  Rodzaj silnika: ");
                    scanf("%s", silnik);
                    printf("  Maks. ladownosc (kg): ");
                    scanf("%lf", &ladownosc);
                    printf("  Liczba kol: ");
                    scanf("%d", &kola);
                    SamochodCiezarowy *nowy = new SamochodCiezarowy();
                    nowy->setCena(cena);
                    nowy->setRodzajSilnika(silnik);
                    nowy->setMaksymalnaLadownosc(ladownosc);
                    nowy->setLiczbaKol(kola);
                    dodajNaKoniec(nowy);
                    break;
                }
                default:
                    printf("Nieznany typ – pomijam.\n");
                    break;
            }
        }
        printf("=== Wczytywanie zakonczone ===\n");
    }
};

// ============================================================
// KROK 4 – funkcja main – demonstracja działania
// ============================================================

int main() {
    // --- Kontener Z Pliku ---
    printf("========================================\n");
    printf("  KONTENER Z PLIKU\n");
    printf("========================================\n");

    KontenerZPliku kzp("lab13_wejsciowka.txt");

    // Działanie 1 – wczytanie z pliku
    kzp.wczytaj();

    // Działanie 2 – wypisanie całej listy
    printf("\n-- Metoda 2: wypisz() --\n");
    kzp.wypisz();

    // Pierwsze przejście przez listę metodami 3 i 4
    printf("\n-- Metoda 3+4: pierwsze przejscie --\n");
    bool eol = kzp.wypiszPierwszy();
    while (!eol) {
        eol = kzp.wypiszNastepny();
    }

    // Drugie przejście przez listę metodami 3 i 4
    printf("\n-- Metoda 3+4: drugie przejscie --\n");
    eol = kzp.wypiszPierwszy();
    while (!eol) {
        eol = kzp.wypiszNastepny();
    }

    // Sprawdzenie zachowania po stanie EOL (metoda 2 ustawia EOL)
    printf("\n-- Test: wywolanie metody 4 po stanie EOL (po metodzie 2) --\n");
    kzp.wypisz();               // ustawia EOL
    kzp.wypiszNastepny();       // powinien wypisac komunikat
    kzp.wypiszNastepny();       // i znowu

    // --- Kontener Z Konsoli ---
    printf("\n========================================\n");
    printf("  KONTENER Z KONSOLI\n");
    printf("========================================\n");

    KontenerZKonsoli kzk;

    // Działanie 1 – wczytanie z konsoli
    kzk.wczytaj();

    // Działanie 2 – wypisanie całej listy
    printf("\n-- Metoda 2: wypisz() --\n");
    kzk.wypisz();

    // Pierwsze przejście przez listę metodami 3 i 4
    printf("\n-- Metoda 3+4: pierwsze przejscie --\n");
    eol = kzk.wypiszPierwszy();
    while (!eol) {
        eol = kzk.wypiszNastepny();
    }

    // Drugie przejście przez listę metodami 3 i 4
    printf("\n-- Metoda 3+4: drugie przejscie --\n");
    eol = kzk.wypiszPierwszy();
    while (!eol) {
        eol = kzk.wypiszNastepny();
    }

    return 0;
}
