use actix_web::{web, App, HttpResponse, HttpServer};
use serde_json::{json, Value};

async fn get_handler(path: web::Path<String>) -> HttpResponse {
    let id = path.into_inner();
    HttpResponse::Ok().json(json!(id))
}

async fn post_handler(body: web::Json<Value>) -> HttpResponse {
    HttpResponse::Ok().json(body.into_inner())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("server starting");
    println!("server listening on port 8000");
    HttpServer::new(|| {
        App::new()
            .route("/api/test/{id}", web::get().to(get_handler))
            .route("/api/test", web::post().to(post_handler))
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
