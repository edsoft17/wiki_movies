export interface ApiCharacter {
    info:    Info;
    results: Character[];
}

export interface Character{
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  string | null;
}

interface Location {
    name: string;
    url:  string;
}