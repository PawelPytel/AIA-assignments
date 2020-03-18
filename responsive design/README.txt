Górną część strony rozmieściłem dzięki właściwości float. Do rozmieszczenia głównego kontentu użyłem właściwości flex. 
Pierwszy raz jej używałem i muszę przyznać, że jej mechanizmy są bardzo potężne. Przedtem responsywne strony projektowałem zawsze z użyciem Bootstrapa,
zrobienie tego przy użyciu tylko float i width byłoby bardzo irytujące. Największe trudności, miałem właśnie z rozmieszczeniem głównej części oraz stopki.
W przypadku tej drugiej rzeczy skorzystałem z właściwości position oraz nadałem stopce ujemny margin-top, dzięki czemu główny kontener ustawiony na min-width:100vh
mógł się "wsunąć" pod stopkę. Pierwszy raz korzystałem z scss. Najbardziej spodobało mi się w nim dziedziczenie klas.