<div class="lds-ripple">
    <div />
    <div />
</div>

<style>
    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 1em;
        height: 1em;
    }

    .lds-ripple div {
        position: absolute;
        border: 0.05em solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes lds-ripple {
        0% {
            top: 0.5em;
            left: 0.5em;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 1em;
            height: 1em;
            opacity: 0;
        }
    }
</style>
