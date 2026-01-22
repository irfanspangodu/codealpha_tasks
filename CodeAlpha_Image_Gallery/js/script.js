$(document).ready(function () {

    const images = [
        { 
            src: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg', 
            category: 'nature' 
        },
        { 
            src: 'https://images.pexels.com/photos/34950/pexels-photo.jpg', 
            category: 'nature' 
        },
        { 
            src: 'https://images.pexels.com/photos/15286/pexels-photo.jpg', 
            category: 'nature' 
        },
        { 
            src: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg', 
            category: 'city' 
        },
        { 
            src: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg', 
            category: 'city' 
        },
        { 
            src: 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg', 
            category: 'city' 
        }
    ];

    let currentImages = [];
    let currentIndex = 0;

    function renderGallery(filter = 'all') {
        $('#gallery').empty();

        currentImages = images.filter(img =>
            filter === 'all' || img.category === filter
        );

        currentImages.forEach((img, index) => {
            $('#gallery').append(`
                <div class="col-sm-6 col-md-4">
                    <div class="gallery-card">
                        <div class="image-wrapper">
                            <img 
                                src="${img.src}?auto=compress&cs=tinysrgb&w=600"
                                class="gallery-img"
                                data-index="${index}"
                                alt="Gallery image" />
                        </div>
                    </div>
                </div>
            `);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        $('#lightboxImage').attr('src', currentImages[index].src);
        $('#lightboxModal').modal('show');
    }

    function navigate(step) {
        currentIndex =
            (currentIndex + step + currentImages.length) % currentImages.length;
        $('#lightboxImage').attr('src', currentImages[currentIndex].src);
    }

    // Init
    renderGallery();

    $('.filter-btn').click(function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        renderGallery($(this).data('filter'));
    });

    $('#gallery').on('click', '.gallery-img', function () {
        openLightbox($(this).data('index'));
    });

    $('#nextBtn').click(() => navigate(1));
    $('#prevBtn').click(() => navigate(-1));
});
