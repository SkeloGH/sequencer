export default
{
    App: {
        centered: false
    },
    Layout: {
        priority: "left",
        fixed: true,
        showOnResponsive: "both",
    },
    PreviewSection: {
        className: "stage__main",
        colorIndex: "neutral-4",
        full: true,
        pad: {
            horizontal: 'medium',
            vertical: 'medium',
        }
    },
    PreviewScreen: {
        squares: [],
        onSquareClick: null
    },
    PlayerBox: {
        buttonSize: "small",
        playing: false,
        onPlay: null,
        onPause: null,
        onForward: null,
        onRewind: null,
    },
    StorySection: {
        className: "story__main",
        colorIndex: "light-2",
        pad: "none",
    },
    StoryHeader: {
        static: true,
        container: {
            colorIndex: "neutral-4-a",
            fixed: true,
            direction: "row",
            justify: "between",
            size: "small",
            pad: {
                horizontal: 'medium',
                vertical: 'medium',
            }
        },
        button: {
            label: "+ Add step",
            onClick: null,
        },
    },
    StoryBoard: {
        container: {
            onClick: null,
            className: "story__list",
            pad: {
                vertical: 'small'
            }
        },
        story: {
            items: [],
            active_num: 0
        }
    }
}
