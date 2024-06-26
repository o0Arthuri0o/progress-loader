const ProgressLoaderTemplate = document.createElement("template")
ProgressLoaderTemplate.innerHTML = `
    <style>
        
        
        @property --progress {
            syntax: "<length-percentage>";
            inherits: false;
            initial-value: 0%;
        }

        .progress-loader {
        
            --size: 100%;
            --bar-width: 20px;
            --color-bar:  #005cff;
            --color-trail: #eaf0f6;
            --center-background:white;

            width: var(--size);
            min-width: 150px;
            aspect-ratio: 1 / 1;
            background: conic-gradient(
                var(--color-bar),
                var(--color-bar) var(--progress, 0),
                var(--color-trail) 0%
            );
            border-radius: 50%;
            display:flex;
            justify-content:center;
            align-items:center;
            animation-fill-mode: forwards;

            transition: --progress 0.5s linear;
        }

        .progress-loader::after {
            content: "";
            background: var(--center-background);
            width: calc(100% - var(--bar-width));
            aspect-ratio: 1;
            border-radius: inherit;
            display: grid;
        }  
        .animation{
            animation: spin 1.5s infinite linear
        } 

        @keyframes spin {
            from {
                transform: rotate(0)
            }
            to {
                transform: rotate(1turn)
            }
        }
    </style>

    <div class="progress-loader" ></div>
`

class ProgressLoader extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:"open"})
        shadow.append(ProgressLoaderTemplate.content.cloneNode(true))
        this.progressLoader = shadow.querySelector(".progress-loader")
    }

    static get observedAttributes() {
        return [
            "value", "animate", "hide", "stroke-width", 
            "progress-color", "trail-color", "bg-color"
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "value":
                this.updateProgressValue(newValue)
                break;
            case "animate":
                this.updateAnimationStatus(newValue)
                break;
            case "hide":
                this.updateHiddenStatus(newValue)
                break;
            case "stroke-width":
                this.updateStrokWidth(newValue)
                break;
            case "progress-color":
                this.setProgressColor(newValue)
                break;
            case "trail-color":
                this.setTrailColor(newValue)
                break;
            case "bg-color":
                this.setBackgroundColor(newValue)
                break;
            default: return
        }
    }

    connectedCallback() {
        console.log("connected")
    }
   
    updateProgressValue(newValue) {
       if(newValue) this.progressLoader.style.setProperty("--progress", newValue + "%")
    }
    updateAnimationStatus(status) {
        if(status === "true") {
            this.progressLoader.classList.add("animation")
        } else if(status === "false") {
            this.progressLoader.classList.remove("animation")
        }
    }
    updateHiddenStatus(status) {
        if(status === "true") {
            this.progressLoader.style.display = "none"
        } else if(status === "false") {
            this.progressLoader.style.display = "flex"
        }
    }
    updateStrokWidth(newStroke) {
      if(newStroke)  this.progressLoader.style.setProperty("--bar-width", newStroke + "px")
    }
    setProgressColor(newColor) {
      if(newColor)  this.progressLoader.style.setProperty("--color-bar", newColor)
    }
    setTrailColor(newColor) {
       if(newColor) this.progressLoader.style.setProperty("--color-trail", newColor)
    } 
    setBackgroundColor(newColor) {
       if(newColor) this.progressLoader.style.setProperty("--center-background", newColor)
    }
    
}

customElements.define("progress-loader", ProgressLoader)

