$(document).ready(function () {

    const images = [
        { 
            src: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg", 
            category: "nature" 
        },
        { 
            src: "https://images.pexels.com/photos/34950/pexels-photo.jpg", 
            category: "nature" 
        },
        { 
            src: "https://images.pexels.com/photos/15286/pexels-photo.jpg", 
            category: "nature" 
        },
        { 
            src: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg", 
            category: "city" 
        },
        { 
            src: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg", 
            category: "city" 
        },
        { 
            src: "https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg", 
            category: "city" 
        }
    ];

    let currentFilter = "all";
    let galleryInstance = null;

    function renderGallery() {
        const container = $("#lightgallery");
        container.empty();

        const filteredImages = images.filter(img =>
            currentFilter === "all" || img.category === currentFilter
        );

        filteredImages.forEach(img => {
            container.append(`
                <div class="col-sm-6 col-md-4">
                    <a href="${img.src}" class="d-block">
                        <img
                            src="${img.src}?auto=compress&cs=tinysrgb&w=600"
                            class="img-fluid rounded-4 shadow-sm"
                            style="height:220px; width:100%; object-fit:cover;"
                            alt="Gallery image"
                            onmouseenter="this.classList.add("shadow-lg")"
                            onmouseleave="this.classList.remove("shadow-lg")"
                        >
                    </a>
                </div>
            `);
        });

        if (galleryInstance) {
            galleryInstance.destroy();
        }

        galleryInstance = lightGallery(document.getElementById("lightgallery"), {
            selector: "a",
            speed: 400,
            download: false,
            thumbnail: true,
            zoom: true
        });
    }

    renderGallery();

    $(".filter-btn").click(function () {
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        currentFilter = $(this).data("filter");
        renderGallery();
    });
});
