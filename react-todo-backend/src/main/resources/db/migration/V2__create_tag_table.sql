create table tag (
    id varchar(36) primary key,
    name varchar(64) not null,
    color varchar(32) not null,
    constraint chk_tag_color check (
        color in (
            'color_1','color_2','color_3','color_4','color_5','color_6',
            'color_7','color_8','color_9','color_10','color_11'
        )
    )
);

create index idx_tag_name on tag (name);

