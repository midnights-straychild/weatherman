class Config:
    conf = {
        "labels": {
            "pageTitle": "Weatherman V0.0.1"
        },
        "db.database": "weatherman",
        "db.username": "postgres",
        "db.password": "postgres"
    }

    def get_config(self):
        return self.conf

    def get(self, key):
        return self.conf[key]
