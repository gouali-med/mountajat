import requests
import os

# URLs des images (à remplacer par des URLs réelles)
image_urls = {
    'product2.jpg': 'https://example.com/product2.jpg',
    'product3.jpg': 'https://example.com/product3.jpg',
    'product4.jpg': 'https://example.com/product4.jpg',
    'product5.jpg': 'https://example.com/product5.jpg',
    'product6.jpg': 'https://example.com/product6.jpg'
}

def download_image(url, filename):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(os.path.join('images', filename), 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Image {filename} téléchargée avec succès")
    except Exception as e:
        print(f"Erreur lors du téléchargement de {filename}: {str(e)}")

# Créer le dossier images s'il n'existe pas
os.makedirs('images', exist_ok=True)

# Télécharger chaque image
for filename, url in image_urls.items():
    download_image(url, filename) 